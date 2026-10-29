import unittest

from support import run_solution


class PrintingMessageTest(unittest.TestCase):
    def test_case_01_one_person(self):
        """one person."""
        result = run_solution('printing-message', 'Guravaiah\n22\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Guravaiah is 22 years old.\n')

    def test_case_02_another(self):
        """another."""
        result = run_solution('printing-message', 'Ravi\n30\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Ravi is 30 years old.\n')


if __name__ == "__main__":
    unittest.main()
