import unittest

from support import run_solution


class MaximumNumberOfHandshakesTest(unittest.TestCase):
    def test_case_01_1_person(self):
        """1 person."""
        result = run_solution('maximum-number-of-handshakes', '1\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n')

    def test_case_02_2_people(self):
        """2 people."""
        result = run_solution('maximum-number-of-handshakes', '2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2\n')

    def test_case_03_5_people(self):
        """5 people."""
        result = run_solution('maximum-number-of-handshakes', '5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '10\n')

    def test_case_04_10_people(self):
        """10 people."""
        result = run_solution('maximum-number-of-handshakes', '10\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '45\n')


if __name__ == "__main__":
    unittest.main()
