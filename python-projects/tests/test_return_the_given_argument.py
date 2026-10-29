import unittest

from support import run_solution


class ReturnTheGivenArgumentTest(unittest.TestCase):
    def test_case_01_forty_two(self):
        """forty two."""
        result = run_solution('return-the-given-argument', '42\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '42\n')

    def test_case_02_seven(self):
        """seven."""
        result = run_solution('return-the-given-argument', '7\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '7\n')


if __name__ == "__main__":
    unittest.main()
