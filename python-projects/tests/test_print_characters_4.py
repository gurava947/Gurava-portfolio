import unittest

from support import run_solution


class PrintCharacters4Test(unittest.TestCase):
    def test_case_01_abc_in_97_to_99(self):
        """abc in 97 to 99."""
        result = run_solution('print-characters-4', 'abc\n97\n99\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'a b c \n')

    def test_case_02_ello_in_72_to_101(self):
        """Hello in 72 to 101."""
        result = run_solution('print-characters-4', 'Hello\n72\n101\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'H e \n')


if __name__ == "__main__":
    unittest.main()
